import Card from '../Card/card';
import './index.css';

const CardList = ({goods}) => {
	return (
		
		<div className='cards'>
			{
				goods.map( (item, index) => <Card key={index} {...item} />)
			}
		</div>
	);
};

export default CardList;
