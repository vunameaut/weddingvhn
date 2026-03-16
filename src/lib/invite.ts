const toBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

const fromBase64Url = (value: string) => {
  const padded = value + '==='.slice((value.length + 3) % 4);
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const encodeRecipientName = (name: string) => {
  const normalizedName = name.trim();
  if (!normalizedName) {
    return '';
  }

  return toBase64Url(normalizedName);
};

export const decodeRecipientName = (encodedName: string) => {
  if (!encodedName) {
    return '';
  }

  try {
    return fromBase64Url(encodedName).trim();
  } catch {
    try {
      return decodeURIComponent(encodedName).trim();
    } catch {
      return encodedName.trim();
    }
  }
};
