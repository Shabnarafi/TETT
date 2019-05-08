const ADMIN_MENU: any[] = [
    {
      title: 'Dashboard',
      link: 'role/admin/dashboard'
    },
    {
      title: 'Courses',
      link: 'role/admin/courses',
      subMenu: [
        {
          title: 'Course Details',
          link: 'role/admin/course-details'
          },
        {
        title: 'Add Course',
        link: 'role/admin/add-courses'
        }
      ]
    },
    {
      title: 'Progress Tracker',
      link: 'role/admin/progress-tracker'
    },
    {
      title: 'Report',
      link: 'role/admin/report'
    }
  ];
  
  const USER_MENU: any[] = [
    {
      title: 'Dashboard',
      link: 'role/user/dashboard'
    },
    {
      title: 'Course Progress',
      link: 'role/user/course-progress'
    }
  ];
  
  export const MENU_ITEMS: {} = {
    admin: ADMIN_MENU,
    user: USER_MENU
  }