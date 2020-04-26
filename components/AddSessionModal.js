import * as React from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableHighlight,
	Modal,
} from "react-native";
import { WheelPicker } from "react-native-simple-wheel-picker";

export default function AddSessionModal(props) {
	const { modalVisible, setModalVisible, addCurrentSession } = props;

	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);

	const onChangeMinutes = (minutesSelected) => {
		if (isNaN(minutesSelected)) {
			setMinutes(0);
		} else {
			setMinutes(minutesSelected);
		}
	};
	const onChangeSeconds = (secondsSelected) => {
		if (isNaN(secondsSelected)) {
			setSeconds(0);
		} else {
			setSeconds(secondsSelected);
		}
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.horizontalFlex}>
						<WheelPicker
							style={{
								...styles.wheelPicker,
								...styles.horizontalFlex,
							}}
							selectedIndex={minutes}
							items={Array.from(Array(100).keys())}
							onSelected={onChangeMinutes}
						/>
						<WheelPicker
							style={{
								...styles.wheelPicker,
								...styles.horizontalFlex,
							}}
							selectedIndex={seconds}
							items={Array.from(Array(100).keys())}
							onSelected={onChangeSeconds}
						/>
					</View>
					<View style={styles.horizontalFlex}>
						<TouchableHighlight
							style={styles.openButton}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text>Close</Text>
						</TouchableHighlight>

						<TouchableHighlight
							style={styles.openButton}
							onPress={() => {
								setModalVisible(!modalVisible);
								addCurrentSession(minutes * 60 + seconds);
							}}
						>
							<Text>Add session</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	wheelPicker: {
		height: 10,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	horizontalFlex: {
		flexDirection: "row",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#2196F3",
		borderRadius: 10,
		padding: 10,
		margin: 10,
		elevation: 2,
		flex: 1,
	},
});
