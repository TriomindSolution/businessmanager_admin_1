export const  parseJwt = (token) => {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}


export const mapArrayToDropdown = (arr, label, value) => {
    const dropdown = arr?.map((item) => ({ ...item, label: item[label], value: item[value] }));
    return dropdown;
  };