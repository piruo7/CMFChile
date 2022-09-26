export const selectValue = (e: string) => {
  switch (e) {
    case 'Dólar': {
      return 'Dolares';
    }
    case 'Euro': {
      return 'Euros';
    }
    case 'UTM': {
      return 'UTMs';
    }
    case 'UF': {
      return 'UFs';
    }
    case 'IPC': {
      return 'IPCs';
    }
    default: {
      return 'Dolares';
    }
  }
};
