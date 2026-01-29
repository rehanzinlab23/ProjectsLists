const key = "links";
export const links = {
     getFromLocalStorage: () => {
          if (!localStorage) return [];
          const linksFromStorage = localStorage.getItem(key);
          if (!linksFromStorage) return [];
          return JSON.parse(linksFromStorage)
     },
     setToLocalStorage: (links) => {
          if (!localStorage) return;
          localStorage.setItem(key, JSON.stringify(links))
     },
     addItem: (link) => {
          const current = links.getFromLocalStorage();
          links.setToLocalStorage([...current, link])
     },
     removeItem: (id) => {
          const current = links.getFromLocalStorage();
          links.setToLocalStorage(current.filter((link) => link.id !== id))
     },
}
