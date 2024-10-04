export const mapNavbarData = (data)=>{
    return {
        header : 'Advertrone Technologies',
        navbarItems : [
            {
                to: '/',
                paths: [''],
                title: 'Dashboard',
                icon: 'home_icon',
                id: 'navitem-1'
            },
            {
                to: '/taskdata',
                paths: [''],
                title: 'Data',
                icon: 'employees_icon',
                id: 'navitem-2'
            },
            {
                to: '/departments',
                paths: ['departments'],
                title: 'Add Lead',
                icon: 'departments_icon',
                id: 'navitem-3'
            },
            {
                to: '/projects',
                paths: ['projects'],
                title: 'Lead Status',
                icon: 'projects_icon',
                id: 'navitem-4'
            },
            
        ],
        employeeName: data?.name ?? '😎'
    }
}