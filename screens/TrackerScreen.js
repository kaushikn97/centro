import * as React from "react";
import {
	StyleSheet,
	View,
	Button,
	Text,
	Modal,
	TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "../redux/actions/TrackerActions";

export default function TrackerScreen() {

	const [selectedDate, setSelectedDate] = React.useState(
		moment().format("YYYY-MM-DD")
	);
	const [modalVisible, setModalVisible] = React.useState(false);

	const dispatch = useDispatch();

	const addSessionToState = () => {
		dispatch(addSession({ date: selectedDate, meditationTime: 150 }));
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<Calendar
					onDayPress={({ dateString }) => {
						setSelectedDate(dateString);
					}}
					markedDates={{
						[selectedDate]: {
							selected: true,
							disableTouchEvent: true,
						},
					}}
				/>
				<Button
					title="Add Session"
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				/>
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
										addSessionToState();
									}}
								>
									<Text>Add session</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</Modal>

				<Text>
					{JSON.stringify(
						useSelector(
							(state) =>
								state.TrackerReducer.sessions[selectedDate]
						)
					)}
				</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
	},
	contentContainer: {
		paddingTop: 15,
	},
	optionIconContainer: {
		marginRight: 12,
	},
	option: {
		backgroundColor: "#fdfdfd",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: 0,
		borderColor: "#ededed",
	},
	lastOption: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optionText: {
		fontSize: 15,
		alignSelf: "flex-start",
		marginTop: 1,
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
});
