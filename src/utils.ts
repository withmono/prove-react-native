function createUrl(path: string, qs: any) {
  let base = `https://develop.d121npziv08191.amplifyapp.com/${path}`;

  const queryParams = [];
  for (const k in qs) {
    const value = typeof qs[k] === 'object' ? JSON.stringify(qs[k]) : qs[k];
    queryParams.push(`${k}=${value}`);
  }

  if (queryParams.length > 0) {
    base += `?${queryParams.join('&')}`;
  }

  return base;
}

export { createUrl };
