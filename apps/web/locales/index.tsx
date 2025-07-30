type Iprops = {
  id: string;
  defaultMessage?: string;
};

export const formatMessage = (obj: Iprops) => {
  return obj?.defaultMessage || "";
};

export const useIntl = () => {
  return {
    formatMessage: (obj: Iprops) => {
      return obj?.defaultMessage || "";
    },
  };
};

export const FormattedMessage = ({ id, defaultMessage }: Iprops) => {
  return defaultMessage;
};
