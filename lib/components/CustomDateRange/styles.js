import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dateContainer: {
    flex: 1,
    marginTop: 10,
    height:45,
    textAlign:'left',
    alignItems:'flex-start',
    borderRadius:0,
    borderWidth:0,
    borderBottomWidth:1
  },
  parentButton:{
    width:'100%',
    flexDirection:'row', 
    height:75,
    justifyContent:'space-around'
  },
  childButton:{ 
    width: '40%', 
    height: 55, 
    borderWidth:2, 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:5,
    borderColor:'blue' 
  },
  textButton:{
    fontSize:20,
    color:'#2a5ac4',
    fontWeight:'400'
  }
});
