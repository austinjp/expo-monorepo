var React
var Component
var render

try {
  React = require('react')
  Component = React.Component
} catch(e) {}

if (!React) {
  try {
    React = require('preact/compat')
    render = React.render
    Component = React.Component
  } catch(e) {}
}


try {
  render = require('react-dom').render
} catch(e) {}


const h = React.createElement
const Fragment = React.Fragment

export { React, h, Component, Fragment, render }
