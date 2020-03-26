var React
var render
var Component
var h

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


h = React.createElement

export { React, h, Component, render }
