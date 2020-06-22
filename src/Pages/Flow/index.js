import React from 'react';
import { Route, withRouter } from "react-router-dom";

import './index.css';

import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
// import Confirm from "@material-ui/core/Confirm";

// import GridItem from "@material-ui/core/GridItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IConButton from "@material-ui/core/IConButton";

import AccountTreeIcon from "@material-ui/icons/AccountTree";

import { withStyles } from "@material-ui/core/styles";

import BpmnModeler from 'bpmn-js/lib/Modeler';

// import transactionBoundariesModule from 'camunda-transaction-boundaries';
import transactionBoundariesModule from 'bpmn-js-transaction-boundaries';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import {withCategory} from "../../Contexts/CategoryContext";

import style from './style';

import apis from '../api'

class Flower extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        confirm: {
          display: false
          , command: 'confirm'
          , title: 'Are you sure?'
          , message: 'Are you sure?'
      }
    };

    this.data = {
      current: {
        diagramId: ''
      }
      , diagrams: []
    };
  }

  initModeler() {
    
    window.bpmnModeler = new BpmnModeler({
      container: "#canvas",
        propertiesPanel: {
          parent: "#properties-panel"
        },
        additionalModules: [
          propertiesPanelModule
          , propertiesProviderModule
          , transactionBoundariesModule
          ],
          moddleExtension: {
            camunda: camundaModdleDescriptor
          },
          keyboard: {
            bindTo: window
          }
        });
        
        var canvas = window.bpmnModeler.get('canvas');
        
        canvas.zoom('fit-viewport');
        
   }
   
   componentDidMount() {
     this.initModeler();
     this.diagramList();
     if(!this.data.current.diagramId){
       this.latest();
     }
   }
   
   doSelectDiagram = diagram => e => {
      const diagramId = diagram.diagram_id;
      apis.get(this.props.category + '/' + diagramId)
      .then((result)=>{
        const diagrams = result.diagramsl;
        if(diagrams && diagrams.length > 0){
          const data = diagrams[0];
          this.openDiagram(decodeURIComponent(data.content));
          
          this.data.current = {
            digramId: diagramId
          };
        }
      })
   }
   
   diagramList(){
     apis.get(this.props.category)
     .then((result)=>{
        this.data.diagrams = result.diagrams;
     }).catch((err)=>{
       console.log(err);
     });
   }
   
   latest(){
     apis.get(this.props.category + '/latest')
     .then((result)=>{
       if(result.diagrams.length > 0){
         const diagram = result.diagrams[0];
         this.setState({
           diagramId: diagram.diagram_id
         });
         this.openDiagram(decodeURIComponent(diagram.content));
       }else{
         throw new Error('empty');
        //  var diagramUrl = '/empty.bpmn';
        //  fetch(diagramUrl, {method: 'GET' })
        //  .then(async (data)=>{
        //    this.openDiagram(await data.text());
        //  }).catch((err)=>{
        //    console.log(err);
        //  });
       }
     }).catch((err)=>{
       console.log(err);
       var diagramUrl = '/empty.bpmn';
       fetch(diagramUrl, {method: 'GET' })
       .then(async (data)=>{
         console.log(data);
         this.openDiagram(await data.text());
       }).catch((err)=>{
         console.log(err);
       });
     });
   }
   
   openDiagram(bpmnXML) {
     const bpmnModeler = window.bpmnModeler;
     bpmnModeler.importXML(bpmnXML).then(function(err){
       if(err){
         return console.error('could not import BPMN 2.0 diagram', err);
       }
       var transactionBoundaries = bpmnModeler.get('transactionBoundaries');
       transactionBoundaries.show();
     }).catch((err)=>{
       console.error(err)
     });
   }
   
   onResetClickEvent = e => {
     this.setState({
       confirm: {
         display: true
         , command: 'reset'
         , title: 'initialize'
         , message: 'are you sure?'
       }
     });
   }
   
   onSaveClickEvent = e => {
     this.setState({
       confirm: {
         display: true
         , command: 'save'
         , title: 'diagram save'
         , message: 'are you sure?'
       }
     });
   }
   
   onApplyClickEvent = e => {
     this.setState({
       confirm: {
         display: true
         , command: 'apply'
         , title: 'service apply'
         , message: 'are you sure?'
       }
     });
   }
   
   onConfirmed(command, isAgreed, e){
     const {post} = this.props;
     const bpmnModeler = window.bpmnModeler;
     const diagramId = this.data.current.diagramId;
     
     const category = this.state.category;
     
     if('save' === command){
       if(isAgreed){
         bpmnModeler.saveXML({ format: true}, function(err, xml){
           if(err) return console.error('error', err);
           apis.post(category, {
             command: 'save'
             , diagram_id: diagramId
             , content: xml
           }).then((rst)=>{
             console.log('done!', rst);
           });
         });
       }
     }else if ('apply' === command ){
       if(isAgreed){
         bpmnModeler.saveXML({ format: true}, function(err, xml){
           if(err) return console.error('error', err);
           apis.post(category, {
             command: 'save'
             , diagram_id: diagramId
             , content: xml
           }).then((rst)=>{
             console.log('done!', rst);
           });
         });
       }
     }else if('reset' === command ){
       if(isAgreed){
         fetch('/empty.bpmn', { method: 'GET' })
         .then(async (data)=>{
           var xml = await data.text();
           this.openDiagram(xml);
           apis.post(category, {
             command: 'apply'
             , diagram_id: diagramId
             , content: xml
           })
           .then((rst)=>{
             console.log('done!', rst);
           });
         }).catch((err)=>{
           console.log(err);
         });
       }
     } else {
     
     }
   }
   
   onConfirmHide(){
     this.setState({
       confirm: {
         display: false
        , command: '-'
        , title: 'are you sure?'
        , message: 'are you sure?'
      }
    });
  }
  
  onReceiveMessage(msg){
    console.log("-----", msg);
  }
  
  render (){
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          {/* <NavBar
            doReset={this.onResetClickEvent}
            doSave={this.onSaveClickEvent}
            doApply={this.onApplyClickEvent} /> */}
            
          <Grid container
            justify="flex-start"
            className={classes.listContainer}>
              <ListItem className={classes.listItem}>
                <List>
                {this.data.diagrams.map((diag, i)=>{
                  return (
                  <ListItem key={diag.diagram_id} role={undefined} dense button onClick={this.doSelectDiagram(diag)}>
                    <ListItemIcon>
                      <IConButton edge="end" aria-label="comments">
                        <AccountTreeIcon />
                      </IConButton>
                    </ListItemIcon>
                    <ListItemText id={diag.diagram_id} primary={`${diag.name}`} />
                  </ListItem>
                  );
                })}
                </List>
              </ListItem>
              <Grid item className={classes.listItemCanvas}>
                <div id="canvas"></div>
              </Grid>
          </Grid>
          </main>
          
          <Drawer
            open={true}
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="right">
            <div className={classes.toolbar} />
            {/* <divider /> */}
            <div id="properties-panel"> </div>
          </Drawer>

          {/* <Confirm
            opener={this}
            command={this.state.confirm.command}
            open={this.state.confirm.display}
            title={this.state.confirm.title}
            message={this.state.confirm.message}
            /> */}

          {/* <RealtimeSocket receive={this.onReceiveMessage} /> */}
        </div>
      )
    }
  }

  export default withRouter(withCategory(withStyles(style)(Flower)));