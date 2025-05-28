import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const megaMenuItems = [
  {
    title: 'Browse All Books',
    path: '/books',
  },
  {
    title: 'Kids',
    subMenu: [
      { title: 'Picture Books', path: '/books/kids/picture-books' },
      { title: 'Early Readers', path: '/books/kids/early-readers' },
    ],
  },
  {
    title: 'Best Sellers',
    subMenu: [
      { title: 'Fiction', path: '/books/best-sellers/fiction' },
      { title: 'Non-Fiction', path: '/books/best-sellers/non-fiction' },
    ],
  },
  {
    title: 'New Arrivals',
    subMenu: [
      { title: 'Fiction', path: '/books/new/fiction' },
      { title: 'Non-Fiction', path: '/books/new/non-fiction' },
    ],
  },
  {
    title: 'Genres',
    subMenu: [
      { title: 'Fiction', path: '/books/genre/fiction' },
      { title: 'Non-Fiction', path: '/books/genre/non-fiction' },
      { title: 'Biography', path: '/books/genre/biography' },
      { title: 'Fantasy', path: '/books/genre/fantasy' },
    ],
  },
];

const MegaMenu = () => {
  return (
    <Menu
      mode="horizontal"
      style={{
        borderBottom: 'none',
        backgroundColor: 'transparent',
        fontWeight: 500,
      }}
    >
      {megaMenuItems.map((item, index) =>
        item.subMenu ? (
          <Menu.SubMenu key={index} title={item.title}>
            {item.subMenu.map((subItem) => (
              <Menu.Item key={subItem.path}>
                <Link to={subItem.path}>{subItem.title}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default MegaMenu;
