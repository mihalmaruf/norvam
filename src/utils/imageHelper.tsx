export const getBase64 = (file: Blob) => new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error: unknown) => reject('Error: ' + error);
})