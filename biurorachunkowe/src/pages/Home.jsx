import AboutMe from '../components/AboutMe'
import Contact from '../components/Contact'
import Header from '../components/Header'
import Newsletter from '../components/Newsletter'
import Reviews from '../components/Reviews'

const Home = () => {
	return (
		<div>
			<Header />
			<AboutMe />
			<Reviews />
			<Newsletter />
			<Contact />
		</div>
	)
}

export default Home
