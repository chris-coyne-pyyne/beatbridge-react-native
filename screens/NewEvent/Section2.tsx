import {ScrollView, StyleSheet} from 'react-native';
import {Button} from '../../components/Button';
import {Text} from '../../components/Text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const Section2 = ({
  setStartVis,
  setEndVis,
  endVis,
  startVis,
  handleStartConfirm,
  handleEndConfirm,
  handleCreate,
  setStep,
}: any) => {
  return (
    <ScrollView>
      <Text size="large" weight="bold">
        Event Itinerary
      </Text>
      <Button
        title="Show Start Date Picker"
        onPress={() => setStartVis(true)}
      />
      <Button title="Show End Date Picker" onPress={() => setEndVis(true)} />
      <DateTimePickerModal
        isVisible={startVis}
        mode="date"
        onConfirm={handleStartConfirm}
        onCancel={() => setStartVis(false)}
      />
      <DateTimePickerModal
        isVisible={endVis}
        mode="date"
        onConfirm={handleEndConfirm}
        onCancel={() => setEndVis(false)}
      />
      <Button title="Prev Section" onPress={() => setStep(1)} filled />
      <Button title="Create Event" onPress={() => handleCreate()} filled />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
});
