import HandsOn from '@/components/hands-on/hands-on.vue';
import { shallowMount } from '@vue/test-utils';

describe('HandsOn', () => {
  it('should render the hands on component', () => {
    const wrapper = shallowMount(HandsOn);

    // Then
    expect(wrapper.html()).toMatchSnapshot();
  });
});
