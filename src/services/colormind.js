const API_ENDPOINT = 'http://colormind.io/api/';

export const loadPalette = ({
  colors = [[0, 0, 0], [172, 64, 0], null, null, null],
  model = 'default',
} = {}) => {
  return new Promise(resolve => {
    const url = API_ENDPOINT;
    const input = colors.map(d => (d ? d : 'N'));

    const data = {
      model,
      input,
    };

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        var palette = JSON.parse(http.responseText).result;
        resolve(palette);
      }
    };

    http.open('POST', url, true);
    http.send(JSON.stringify(data));
  });
};
