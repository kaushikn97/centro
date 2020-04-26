import * as React from "react";
import {
	Text,
	StyleSheet,
	Button,
	View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import usePreciseTimer from "../utils/CustomHooks";
import { useDispatch } from "react-redux";
import { addSession } from "../redux/actions/TrackerActions";
import moment from "moment";
import AddSessionModal from "../components/AddSessionModal";

export default function MeditateScreen() {

	const [time, setTime] = React.useState(0);
	const [timerState, changeTimerState] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const dispatch = useDispatch();

	const incrementTime = (add) => {
		setTime(time + add);
	};

	usePreciseTimer(incrementTime, 10, timerState);

	const startTimer = () => {
		changeTimerState(true);
	};

	const stopTimer = () => {
		changeTimerState(false);
		setTime(0);
	};

	const pauseTimer = () => {
		changeTimerState(false);
	};

	const addCurrentSession = (meditationTime = time) => {
		dispatch(
			addSession({
				date: moment().format("YYYY-MM-DD"),
				meditationTime
			})
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.secondsNumber}>{Math.trunc(time)}</Text>
				<Text>{Math.round((time - Math.trunc(time)) * 100)}</Text>
				<Button title="Start time" onPress={startTimer} />
				<Button title="Stop time" onPress={stopTimer} />
				<Button title="Pause time" onPress={pauseTimer} />
				<Button
					title="Add Current Session"
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				/>
				<AddSessionModal modalVisible={modalVisible} setModalVisible={setModalVisible} addCurrentSession = {addCurrentSession}/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	secondsNumber: {
		fontWeight: "bold",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	contentContainer: {
		paddingTop: 30,
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
	// tabBarInfoContainer: {
	//   position: 'absolute',
	//   bottom: 0,
	//   left: 0,
	//   right: 0,
	//   ...Platform.select({
	//     ios: {
	//       shadowColor: 'black',
	//       shadowOffset: { width: 0, height: -3 },
	//       shadowOpacity: 0.1,
	//       shadowRadius: 3,
	//     },
	//     android: {
	//       elevation: 20,
	//     },
	//   }),
	//   alignItems: 'center',
	//   backgroundColor: '#fbfbfb',
	//   paddingVertical: 20,
	// }
});
