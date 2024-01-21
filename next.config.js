const path = require("path");

module.exports = {
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(__dirname);
        return config;
    },
    images: {
        domains: [
            "huesos.com",
            "tlqvhaqcusstnyakthdf.supabase.co",
            "cdn-icons-png.flaticon.com",
        ],
    },
    // head: {
    //   title: 'dmytrov-admin',
    //   link: [
    //     {
    //       rel: 'icon',
    //       type: 'image/x-icon',
    //       href: '/dmytrov.ico',
    //     },
    //   ],
    // },
};
