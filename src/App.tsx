import styles from './App.module.css';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useMemo } from 'react';
import { routes, routesLabels } from './app/router/routes.ts';

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = useMemo(() => {
    return location.pathname === '/login' || location.pathname === '/register';
  }, [location]);

  const breadcrumbs = useMemo(() => {
    if (location.pathname === routes.login) return [{ title: 'Login' }];
    if (location.pathname === routes.register) return [{ title: 'Register' }];

    const urlPaths = location.pathname
      .split('/')
      .filter((item) => Boolean(item));

    const routesLabelsKeys = Object.keys(
      routesLabels,
    ) as (keyof typeof routesLabels)[];

    return urlPaths.map((path) => {
      const isIncluded = routesLabelsKeys.includes(
        path as keyof typeof routesLabels,
      );

      return {
        title: isIncluded
          ? routesLabels[path as keyof typeof routesLabels]
          : path,
        link: `/${path}`,
      };
    });
  }, [location.pathname]);

  const navigateTo: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout>
      <Header className={`${styles.header} ${isAuthPage && styles.disabled}`}>
        <Menu
          onClick={navigateTo}
          theme="dark"
          mode="horizontal"
          multiple={true}
          selectedKeys={[location.pathname]}
          items={[
            {
              label: 'Продукты',
              key: routes.products,
            },
            { label: 'Заказы', key: '/orders' },
            { label: 'Категории', key: '/categories' },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbs} />
        <div
          style={{
            padding: 24,
            display: 'flex',
            minHeight: 'calc(100vh - 185px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
          <ScrollRestoration />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Pizzeria ©{new Date().getFullYear()} Created by Zhenya Bets
      </Footer>
    </Layout>
  );
}

export default App;
