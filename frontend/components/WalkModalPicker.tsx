import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const OPTIONS = ['Pee', 'Poop', 'Drink', 'Interaction'];
const ICONS = [
  require('../assets/images/pee-icon.png'),
  require('../assets/images/poop-icon.png'),
  require('../assets/images/drink-icon.png'),
  require('../assets/images/interaction-icon.png'),
]

const WalkModalPicker = ({ toggleActionListVisible }) => {

  return (
    <View>
      <TouchableOpacity
        style={styles.background}
        onPress={toggleActionListVisible}
      >
        <View style={styles.listView}>
          <TouchableOpacity
            key={0}
            style={styles.option}
          >
            <Image
                style={styles.peeIcon}
                source={ICONS[0]}
            />
            <Text>{OPTIONS[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={1}
            style={styles.option}
          >
            <Image
                style={styles.poopIcon}
                source={ICONS[1]}
            />
            <Text>{OPTIONS[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={2}
            style={styles.option}
          >
            <Image
                style={styles.drinkIcon}
                source={ICONS[2]}
            />
            <Text>{OPTIONS[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={3}
            style={[styles.option, styles.lastOption]}
          >
            <Image
                style={styles.interactionIcon}
                source={ICONS[3]}
            />
            <Text>{OPTIONS[3]}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'flex-end'
  },
  listView: {
    width: 135,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 250,
  },
  option: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#5A433E',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  peeIcon: {
    marginRight: 7,
    height: 15,
    width: 30,
  },
  poopIcon: {
    marginRight: 7,
    width: 30,
    height: 34,
  },
  drinkIcon: {
    marginRight: 7,
    width: 30,
    height: 24,
  },
  interactionIcon: {
    marginRight: 7,
    width: 30,
  }
});

export default WalkModalPicker;