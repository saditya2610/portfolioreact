export const getExperienceData = (t) => [
    {
        id: 1,
        company: "Universitas Abdurrab Pekanbaru",
        role: "IT, Programmer (Full Time)",
        period: "Jan 2024 - Present",
        desc: t('home.experience.role1_desc')
    },
    {
        id: 2,
        company: "Koni Provinsi Riau",
        role: "IT, Application Implementor (Contract)",
        period: "Aug 2023 - Dec 2023",
        desc: t('home.experience.role2_desc')
    },
    {
        id: 3,
        company: "Dinas Perhubungan Provinsi Riau",
        role: "Publication Service, Programmer",
        period: "2022-2022",
        desc: t('home.experience.role3_desc')
    },
    {
        id: 4,
        company: "Youtube Channel",
        role: "Content Creator",
        period: "2017-Present",
        desc: t('home.experience.role4_desc')
    }
];

export const getEducationData = (t) => [
    {
        institution: "UIN SUSKA RIAU",
        degree: t('home.education.edu1_degree'),
        period: "2019 - 2023",
        desc: "Pekanbaru, Riau, Indonesia."
    },
    {
        institution: "Digitalent Scholarship (Kominfo)",
        degree: t('home.education.edu2_degree'),
        period: "2022",
        desc: t('home.education.edu2_desc')
    },
    {
        institution: "SMAN 4 Pekanbaru",
        degree: t('home.education.edu3_degree'),
        period: "2016 - 2018",
        desc: t('home.education.edu3_desc')
    }
];

export const getProjectsData = (t) => [
    {
        id: 1,
        category: t('projects.categories.webApp'),
        title: "Sistem Polling (SISPOL)",
        description: t('projects.project1_desc'),
        image: "/assets/img/blog/sispol.png",
        link: "https://github.com/saditya2610/sispol",
        delay: 0
    },
    {
        id: 2,
        category: t('projects.categories.mobileApp'),
        title: "Univrab Mobile",
        description: t('projects.project2_desc'),
        image: "/assets/img/blog/mobile.png",
        link: "https://github.com/saditya2610/univrabmobile",
        delay: 100
    },
    {
        id: 3,
        category: t('projects.categories.webDesign'),
        title: "Web Fakultas Teknik",
        description: t('projects.project3_desc'),
        image: "/assets/img/blog/Web_Fakul.png",
        link: "https://fakultas-teknik.univrab.ac.id/",
        delay: 200
    }
];

export const getServicesData = (t) => [
    {
        icon: "fas fa-pencil-alt",
        title: t('home.services.service1_title'),
        description: t('home.services.service1_desc'),
        delay: "100"
    },
    {
        icon: "fas fa-palette",
        title: t('home.services.service2_title'),
        description: t('home.services.service2_desc'),
        delay: "200"
    },
    {
        icon: "fas fa-code",
        title: t('home.services.service3_title'),
        description: t('home.services.service3_desc'),
        delay: "300"
    },
    {
        icon: "fas fa-search",
        title: t('home.services.service4_title'),
        description: t('home.services.service4_desc'),
        delay: "400"
    }
];
