
export  async function getRequest(url: string) {
    const response = await fetch(url);
    if (response.status < 200 && response.status > 299) {
        throw new  Error(`Không thể truy cập ${url}`) 
    }
    
    return response.json();
}