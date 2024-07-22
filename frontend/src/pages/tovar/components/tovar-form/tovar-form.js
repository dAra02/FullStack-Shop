import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon, Input, Loader } from '../../../../components';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveTovarAsync } from '../../../../actions';
import styled from 'styled-components';
import { request } from '../../../../utils/request';

const TovarFormContainer = ({ className, tovar: { id, imageUrl, title, price, content, categorId } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const [priceValue, setPriceValue] = useState(price);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const contentRef = useRef(null);
	const [selectedCategorId, setSelectedCategorId] = useState(categorId);
	const [categor, setCategor] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
		setPriceValue(price);
	}, [imageUrl, title, price]);

	useEffect(() => {
		request('/categor').then(({ error, data }) => {
			if (error) {
				return;
			}
			setIsLoading(false);
			setCategor(data);
		});
	}, []);

	const onSave = () => {
		setIsLoading(true);
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			saveTovarAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				price: priceValue,
				content: newContent,
				categor: selectedCategorId,
			}),
		).then(({ error }) => {
			if (error) {
				setErrorMessage(error);
				setIsLoading(false);
			} else {
				navigate(`/admin`);
			}
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	const onTovarChange = ({ target }) => {
		if (target.value === '') {
			return;
		}
		setSelectedCategorId(Number(target.value));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(Number(target.value));

	return (
		<div className={className}>
			{errorMessage ? <div className="error">{errorMessage}</div> : ''}
			<Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange} />
			<Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange} />
			<Input value={priceValue} type="number" width="25%" placeholder="Цена..." onChange={onPriceChange} />
			<div className="icon-and-select">
				<div className="categor-select">
					<div className="text-categor">Выбор категории:</div>
					<select value={selectedCategorId} onChange={onTovarChange}>
						<option value="" className="scrit"></option>
						{categor
							.filter(({ id }) => id !== 0)
							.map(({ id: categorId, name }) => (
								<option key={categorId} value={categorId}>
									{name}
								</option>
							))}
					</select>
				</div>
				<div className="icon">
					<Icon id="fa-floppy-o" size="21px" margin="0 10px 0 0" onClick={onSave} />
				</div>
			</div>
			<div className="info">
				<span>Описание: </span>
				<div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} className="info-text">
					{content}
				</div>
			</div>
		</div>
	);
};

export const TovarForm = styled(TovarFormContainer)`
	padding: 25px 25px 0;

	& .text-categor {
		font-size: 21px;
		font-weight: 500;
		margin: 0 0 5px 0;
	}

	& .icon-and-select {
		display: flex;
		align-items: center;
		margin: 0 0 5px 0;
		justify-content: space-between;
	}

	& select {
		height: 50px;
		width: 100%;
		font-size: 20px;
	}

	& .icon {
		width: 25px;
	}

	& .info-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 20px;
		margin: 10px 0 0 0;
		white-space: pre-line;
		padding: 0 0 0 5px;
	}

	.error {
		font-size: 25px;
		font-weight: 500;
		text-align: center;
		padding: 0 0 15px 0;
	}

	.scrit {
		display: none;
	}
`;
