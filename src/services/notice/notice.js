import { fetchUrl } from "../../utils/fetchUrl";

export const getNotices = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/admin/notices`;
  
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    const requestOptions = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };
  
    const response = await fetchUrl(url, requestOptions);
    return response;
  };