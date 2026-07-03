import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: Props) => {
	const [isArticleSettingsOpen, setIsArticleSettingsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const toggleOpen = () => setIsArticleSettingsOpen((prev) => !prev);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isArticleSettingsOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsArticleSettingsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isArticleSettingsOpen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
		setIsArticleSettingsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isArticleSettingsOpen} onClick={toggleOpen} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isArticleSettingsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormState((prev) => ({
								...prev,
								fontFamilyOption: value,
							}))
						}
					/>

					<RadioGroup
						name='fontSizeOption'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							setFormState((prev) => ({
								...prev,
								fontSizeOption: value,
							}))
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) =>
							setFormState((prev) => ({
								...prev,
								fontColor: value,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState((prev) => ({
								...prev,
								backgroundColor: value,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState((prev) => ({
								...prev,
								contentWidth: value,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
