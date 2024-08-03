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
                to: '/employees',
                paths: ['employees'],
                title: 'Assigement',
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
            {
                to: '/tasks',
                paths: ['tasks'],
                title: 'Withrawal',
                icon: 'tasks_icon',
                id: 'navitem-5'
            },
            {
                to: '/taskdata',
                paths: ['taskdata'],
                title: 'Data Task',
                icon: 'data_icon',
                id: 'navitem-6'
            },
            {
                to: '/profile',
                paths: ['profile'],
                title: 'Withrawal History',
                icon: 'profile_icon',
                id: 'navitem-8'
            },
        ],
        employeeName: data?.name ?? '😎'
    }
}