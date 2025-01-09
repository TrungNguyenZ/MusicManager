export const GlobalComponent = {
    // Api Calling
    API_URL : 'https://api-node.themesbrand.website/',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    // AUTH_API:"http://api.kindmedia.vn:8080/",
    AUTH_API:"https://localhost:7159/",

    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
   
}