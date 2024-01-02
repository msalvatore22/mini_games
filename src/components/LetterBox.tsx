import styled from "styled-components";

interface LetterBoxProps {
	letter: string;
	color: string;
	type: string;
	handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const StyledLetterBox = styled.div.attrs<{ $type?: string }>((props) => ({}))`
	border: 1px solid
		${({ color }) => {
			if (color === "none") {
				return "white";
			}
			return color;
		}};
	border-radius: ${(props) => {
		if (props.$type == "board") {
			return "1px";
		} else {
			return "6px";
		}
	}};
	height: 60px;
	width: ${(props) => {
		if (props.$type == "keyboard") {
			return "40px";
		} else {
			return "60px";
		}
	}};
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 3px;
	font-size: ${(props) => {
		if (props.$type == "board") {
			return "xx-large";
		} else {
			return "";
		}
	}};
	background-color: ${({ color }) => color};
	cursor: ${(props) => {
		if (props.$type == "keyboard") {
			return "pointer";
		}
	}};
`;

const LetterBox: React.FC<LetterBoxProps> = ({ letter, color, type, handleClick }) => {
	return (
		<StyledLetterBox color={color} $type={type} onClick={handleClick}>
			{letter}
		</StyledLetterBox>
	);
};

export default LetterBox;
