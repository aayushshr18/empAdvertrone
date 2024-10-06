export const mapNavbarData = (data)=>{
    return {
        
        navbarItems : [
           
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
                to: '/taskdata',
                paths: ['taskdata'],
                title: 'Data Task',
                icon: 'data_icon',
                id: 'navitem-6'
            },
            
        ],
        employeeName: data?.name ?? '😎'
    }
}