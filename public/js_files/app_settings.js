let APP_CONFIG_DATA = {
    apiUrl: "http://192.168.29.180:3000",
    appTitle: "INS THINGS LIVE",
    // appSubTitle: "sync your operations",
    companyName: "INSTRUTEL SYSTEMS PVT. LTD.",
    companyLogo: "assets/logos/INSTRUTEL_LOGO/instrutel_logo.png",
    /**
     * @description "Must shoud be use ',' for address seperation"
     * @description "Ex: 2nd Floor,H.No. 5-5-35/18,Prashanthi Nagar,Kukatpally,Hyderabad,Telangana - 500072."
     */
    companyAddress: {
        address_1: "2nd Floor, H.No. 5-5-35/18/2",
        address_2: "",
        street: "Prashanthi Nagar",
        village: "Kukatpally",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500072"
    },
    companyFavicon: "assets/logos/INSTRUTEL_LOGO/instrutel_logo_circle_favicon.png",
    waitSpinnerTimeOut: 1000, 

    /**
     * @description "Below two parameters are using for documents upload path in differenet OS"
     */
    linuxPath: "usr",
    windowsPath: "D:",
    licenceContactDetails: "+91 851-990-2565."
}
