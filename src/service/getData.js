export async function getCountries(name) {
    try {
        const response = await fetch("https://excitel-countries.azurewebsites.net/countries/" + name);
        const data = await response.json();
        if(data.length === 0)
            window.alert('Error: No countries found');
        return data;
    } catch (e) {
        return window.alert('Error: ' + e);
    }
}

