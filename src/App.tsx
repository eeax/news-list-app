import { Layout } from 'antd';
import NewsList from './components/NewsList';
import { layoutStyle, headerStyle, headerH1, contentStyle } from './styles/layoutStyles';

const { Content, Header } = Layout;

function App() {
    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <div style={{ width:'90vw'}}>
                    <h1 style={headerH1}>Новости</h1>
                </div>
            </Header>
            <Content style={contentStyle}>
                <NewsList />
            </Content>
        </Layout>
    );
}

export default App;
