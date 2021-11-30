export const adjustColor = (color: string, amount: number = -20) => {
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, value =>
          (
            '0' +
            Math.min(255, Math.max(0, parseInt(value, 16) + amount)).toString(16)
          ).substr(-2),
        )
    );
  };
  