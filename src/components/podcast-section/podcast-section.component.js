import React from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../../styles/index.styles';
import {
  sliderWidth,
  itemWidth,
  verticalSlideHeight,
  verticalSlideWidth,
  itemHeight
} from '../podcast-item/styles';
import PodcastItem from '../podcast-item';

class PodcastSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0
    };
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item, index }) {
    const { isVertical, routeName } = this.props;
    return (
      <PodcastItem
        data={item}
        even={(index + 1) % 2 === 0}
        routeName={routeName}
        isVertical={isVertical}
      />
    );
  }

  render() {
    const { section, isVertical } = this.props;
    const { slider1ActiveSlide } = this.state;
    return (
      <View style={styles.exampleContainer}>
        {!(slider1ActiveSlide > 0 && isVertical) && (
          <Text style={styles.title}>{section.listName}</Text>
        )}
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={section.items}
          renderItem={this._renderItem}
          sliderWidth={isVertical ? verticalSlideWidth : sliderWidth}
          itemWidth={isVertical ? verticalSlideWidth : itemWidth}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainyarer}
          autoplay={false}
          vertical={isVertical}
          sliderHeight={isVertical ? verticalSlideHeight : null}
          itemHeight={isVertical ? itemHeight : null}
          onBeforeSnapToItem={index =>
            this.setState({ slider1ActiveSlide: index })
          }
        />
      </View>
    );
  }
}

export default PodcastSection;
