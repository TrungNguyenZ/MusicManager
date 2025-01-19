export const GlobalComponent = {
    // Api Calling
    API_URL : 'http://api.kindmedia.vn:8080/',
    // API_URL : 'https://localhost:44347/',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"http://api.kindmedia.vn:8080/",
    // AUTH_API:"https://localhost:44347/",

}