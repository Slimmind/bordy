import Header from './components/header';
import Main from './components/main';
import ColumnWrap from './components/column-wrap';
import { AppContextProvider } from './context/app-context';

function App() {
	return (
		<AppContextProvider>
			<Header />
			<Main>
				<ColumnWrap />
			</Main>
		</AppContextProvider>
	);
}

export default App;
