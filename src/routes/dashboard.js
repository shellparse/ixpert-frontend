import '../App.css'
import Footer from '../components/dashComponents/Footer'
import Header from '../components/dashComponents/Header'
import Main from '../components/dashComponents/Main'
import MainNav from '../components/dashComponents/MainNav'
import SecondaryNav from '../components/dashComponents/SeconderyNav'

export default function DashBoard() {
    return (
        <div className='dashboard'>
            <MainNav />
            <Header />
            <Main />
            <SecondaryNav />
            <Footer />
        </div>
    )
}