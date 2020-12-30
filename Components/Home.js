import React,{useState,useEffect}from 'react';
import {StyleSheet,Text,View,ScrollView ,ActivityIndicator,StatusBar}from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Constants from 'expo-constants';
function Home(){
  const [isLoading, setLoading] = useState(true);
  const [population,setPopulation]=useState();
  const [TotalCase,setTotalCase]=useState();
  const [Recovered,setRecovered]=useState();
  const [Deaths,setDeaths]=useState();
  const [CriticalCase,setCriticalCase]=useState();
  const [LastUpdate,setLstUpdaate]=useState();
  const CasesPercentage=((TotalCase/population)*100).toFixed(1);
  const RecoveredPercentage=((Recovered/TotalCase)*100).toFixed(1);
  const CriticalPercentage=((CriticalCase/TotalCase)*100).toFixed(1);
  const DeathsPercentage=((Deaths/TotalCase)*100).toFixed(1);


  useEffect(()=>{
    fetch("https://world-population.p.rapidapi.com/worldpopulation", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a0d912f87emsha0f3949be136804p12a4b2jsn22b01b22b247",
        "x-rapidapi-host": "world-population.p.rapidapi.com"
      }
    })
    .then((response) => response.json())
    .then((rj)=>{
      setLoading(false);
      setPopulation(rj.body.world_population);
      })
      .catch((error)=>{console.log(error)});
  },[]);

  useEffect(()=>{
    fetch("https://covid-19-data.p.rapidapi.com/totals", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a0d912f87emsha0f3949be136804p12a4b2jsn22b01b22b247",
	      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      }
    })
    .then((response) => response.json())
    .then((rj)=>{
      setTotalCase(rj[0].confirmed);
      setRecovered(rj[0].recovered);
      setCriticalCase(rj[0].critical);
      setDeaths(rj[0].deaths);
      setLstUpdaate(rj[0].lastUpdate);
      })
      .catch((error)=>{console.log(error)});
  }),[];


  return(
    <ScrollView  contentContainerStyle={styles.container}>
        <View style={styles.populationContainer}>
          <Text style={styles.populationHeader}>Population : {population}</Text>
        </View>
        <View style={{backgroundColor:'white',alignItems:'center',width:'100%'}}>
        <View style={styles.text}>
        <Text style={styles.details}>Confirmed Cases</Text>
        <ProgressCircle percent={Number(CasesPercentage)} radius={60} borderWidth={5} color="#c6b497" shadowColor="lightgray" bgColor="whitesmoke">
          <Text style={{ fontSize: 18,fontWeight:'bold'}}>{CasesPercentage}%</Text>
        </ProgressCircle>
        <Text style={styles.detailnumber}>{TotalCase}</Text>
        </View>
        <View style={styles.middleColumn}>
        <View style={styles.midrow}>
          <Text style={styles.MidDetails}>Recovered</Text>
          <ProgressCircle percent={Number(RecoveredPercentage)} radius={45} borderWidth={4} color="green" shadowColor="lightgray" bgColor="whitesmoke">
            <Text style={{ fontSize: 13,fontWeight:'bold'}}>{RecoveredPercentage}%</Text>
          </ProgressCircle>
          <Text style={styles.midDetailNumber}>{Recovered}</Text>
        </View>
        <View style={styles.midrow}>
          <Text style={styles.MidDetails}>Critical Cases</Text>
          <ProgressCircle percent={Number(CriticalPercentage)} radius={45} borderWidth={4} color="maroon" shadowColor="lightgray" bgColor="whitesmoke">
            <Text style={{ fontSize: 13,fontWeight:'bold'}}>{CriticalPercentage}%</Text>
          </ProgressCircle>
          <Text style={styles.midDetailNumber}>{CriticalCase}</Text>
        </View>
       </View>
        <View style={styles.text}>
          <Text style={styles.details}> Deaths </Text>
          <ProgressCircle percent={Number(DeathsPercentage)} radius={60} borderWidth={5} color="red" shadowColor="lightgray" bgColor="whitesmoke">
            <Text style={{ fontSize: 18,fontWeight:'bold'}}>{DeathsPercentage}%</Text>
          </ProgressCircle>
          <Text  style={styles.detailnumber}>{Deaths}</Text>
        </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Last Updated : {LastUpdate}</Text>
        </View>
    </ScrollView >
    
  );
}
const styles=StyleSheet.create(
  {
    container:
    {
      flex:1,
      width:'100%',
      alignItems:"center",
      backgroundColor:'#fe9070',
      justifyContent:'center',
      textAlign:'center',
      marginTop: Constants.statusBarHeight
    },
    populationContainer:{
      // borderWidth:1,
      width:'100%',
      backgroundColor:'#fe9070',
      padding:4,
      paddingVertical:10
    },
    populationHeader:{
      fontSize:30,
      fontWeight:'bold',
      fontFamily:'sans-serif-condensed',
      margin:7,
      textAlign:'center',
      color:'black'
    },
    text:{
      alignItems:'center',
      margin:7,
      paddingHorizontal:7
    },
    details:{
      // width:'100%',
      // borderWidth:1,
      color:'black',
      fontSize:30,
      fontWeight:'bold',
      fontFamily:'sans-serif-condensed',
      margin:7

    },
    detailnumber:{
      // borderWidth:1,
      fontSize:35,
      fontWeight:'bold',
      fontFamily:'sans-serif-condensed',
      color:'red'
    },
    footer:{
      bottom:0,
      backgroundColor:'#fe9070',
      width:'100%'
    },
    footerText:{
      fontSize:15,
      fontWeight:'bold',
      fontFamily:'sans-serif-condensed',
      margin:7,
      textAlign:'center',
      color:'black',
      paddingTop:10,
    },
    middleColumn:{
      width:'90%',
      flexDirection:'row',
      justifyContent:"space-around",
      // borderWidth:1,
      paddingVertical:3,
    },
    midrow:{
      // borderWidth:1,
      alignItems:'center',
      padding:2,
    },
    MidDetails:{
      // borderWidth:1,
      color:'black',
      fontSize:20,
      fontWeight:'bold',
      fontFamily:'sans-serif-condensed',
      marginVertical:5
    },
    midDetailNumber:{
      // borderWidth:1,
      fontWeight:'bold',
      fontSize:20,
      marginVertical:5,
      fontFamily:'sans-serif-condensed',
    }
  }
);
export default Home;