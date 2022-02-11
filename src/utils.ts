import axios from 'axios';


export const getHomeGuideContent = async () => {
    const res = await axios(`http://localhost:3000/DB.json`);
    const valueArr = res.data.account.welcome_ordering;

}