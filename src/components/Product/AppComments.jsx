import { useState } from 'react';
// import './AppComments.module.css'

function AppComments(){
	//hooks and logiq
	const [comment, setComment] = useState('');
	//ListOfComments logiq
	const [comments, setComments] = useState([]);	
	const onClickHandler = () => {
		setComments((comments) => [...comments, comment]);
	};
	const onChangeHandler = (e) => {
		setComment(e.target.value);
	}
	//Comment_Form
	return (
	<div className='main-container-comment'>
		{comments.map((text) => (
			<div className='comment-container'>{text}</div>
		))}
		//Будет выводится над формой после нажатия кнопки
		

		//Здесь то, что мы вводим в качестве текста для комментария
		<div className='comment-flexbox'>
		<h3 className='comment-text'>Оставить комментарий</h3>
		<textarea 
		value={comment}
        onChange={onChangeHandler}
		className='comment-inputbox' 
		/>
		<button onClick={onClickHandler} className='comment-button'>
			Отправить
		</button>
		</div>
	</div>
	);
}
export default AppComments