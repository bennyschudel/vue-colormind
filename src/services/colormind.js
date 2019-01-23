const API_ENDPOINT = 'http://colormind.io/';

export const loadPalette = ({
  colors = [[0, 0, 0], [172, 64, 0], null, null, null],
  model = 'default',
} = {}) => {
  return new Promise(resolve => {
    const url = `${API_ENDPOINT}api/`;
    let input = colors.map(d => (d ? d : 'N'));

    if (input.every(v => v === 'N')) {
      input = undefined;
    }

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

export const loadAvailableModels = () => {
  return new Promise(resolve => {
    const url = `${API_ENDPOINT}list/`;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        var models = JSON.parse(http.responseText).result;
        resolve(models);
      }
    };

    http.open('GET', url, true);
    http.send();
  });
};
