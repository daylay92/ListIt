import React, { Component } from 'react';
import WithClass from '../../WithClass';
import classes from './DefaultLayout.module.css';
import Header from '../../../components/navHeaders/default/header/Header';
import Footer from '../../../components/footer/Footer';

class DefaultLayout extends Component {
  state = {
    showNavResponsive: false,
    toggleBtn: null,
    dynamicHeaderHeight: 0
  };
  toggleBtnClickHandler = ({ target }) => {
    this.setState(({ showNavResponsive }) => ({
      showNavResponsive: !showNavResponsive,
      toggleBtn: target
    }));
  };
  sizeGrid() {
    const { toggleBtn } = this.state;
    if (toggleBtn) {
      const toggleParent =
        toggleBtn.parentElement.nodeName.toLowerCase() === 'svg'
          ? toggleBtn.parentElement.parentElement
          : toggleBtn.parentElement;
      return toggleParent.nextElementSibling.clientHeight;
    }
    return 0;
  }
  setHeaderDimension() {
    const navListHeight = this.state.dynamicHeaderHeight;
    return navListHeight && this.state.showNavResponsive
      ? { gridTemplateRows: `${65 + navListHeight}px auto 65px` }
      : { gridTemplateRows: '65px auto 65px' };
  }
  updateSizing() {
    if (window.innerWidth > 600 && this.state.showNavResponsive)
      this.setState({ showNavResponsive: false });
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateSizing.bind(this));
  }
  componentDidUpdate() {
    if (!this.state.dynamicHeaderHeight && this.state.showNavResponsive) {
      this.setState({
        dynamicHeaderHeight: this.sizeGrid()
      });
    }
    console.log('I am updating');
  }
  render() {
    return (
      <WithClass
        class={classes['default-grid']}
        style={this.setHeaderDimension()}
      >
        <Header
          click={this.toggleBtnClickHandler}
          isShow={this.state.showNavResponsive}
        />
        <main className='main'>{this.props.children}</main>
        <Footer />
      </WithClass>
    );
  }
}

export default DefaultLayout;
