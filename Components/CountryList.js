import React,{useState,useEffect}from 'react';
import { Text, View, StyleSheet ,ScrollView,SafeAreaView,TouchableOpacity,ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';


export default function CountryList({navigation}) {
    const [Countries, setCountries]=useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        fetch("https://world-population.p.rapidapi.com/allcountriesname", {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "a0d912f87emsha0f3949be136804p12a4b2jsn22b01b22b247",
	        "x-rapidapi-host": "world-population.p.rapidapi.com",
          }
        })
        .then((response) => response.json())
        .then((json)=>{
          setLoading(false);
          setCountries(json.body.countries);
          })
          .catch((error)=>{console.log(error)});
      },[]);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Countries</Text></View>
        <ScrollView style={styles.scrollView}>
        {isLoading?<ActivityIndicator color='lightblue'/>:
            <View>
                {Countries.map((item,key)=>
                    (
                        <TouchableOpacity key={key} style={styles.button} onPress={()=>{navigation.navigate('Country Statistics',{item})}}>
                          <Text style={styles.buttonText}>{item}</Text>
                        </TouchableOpacity>)
                    )
                }
            </View>}
        
        </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // backgroundColor:"#fe9070",
  },
  scrollView: {
    // backgroundColor: 'pink',
    margin:30,
  },
  button:{
    //   borderWidth:1,
      borderRadius:20,
      padding:10,
      margin:10,
      alignItems:'center',
      backgroundColor:'#fe9070'

  },
  buttonText:{
    fontFamily:'sans-serif-condensed',
    fontSize:20,
    // fontWeight:'bold'
  },
  header:{
    // borderWidth:1,
    padding:20,
    backgroundColor:"#fe9070",
    alignItems:'center'
  },
  headerText:{
      fontFamily:'sans-serif-condensed',
      fontSize:32,
      fontWeight:'bold',
  }
  
 
});
