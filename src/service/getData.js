import { requestUrl } from "../resources";

export async function getCountries(name) {
    try {
        const response = await fetch(requestUrl + name);
        const data = await response.json();
        if(data.length === 0)
            window.alert('Error: No countries found');
        return data;
    } catch (e) {
        return window.alert('Error: ' + e);
    }
}

