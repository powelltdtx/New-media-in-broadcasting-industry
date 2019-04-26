package com.besto.epgms.manage.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;


/***
* Project:  					ystvideosyn
* Module ID:   		      		ReadXml
* Comments:  					读取xml中参数         
* JDK version used:				JDK1.7
* Author   						<powell/滕翔>
* Create Date  					2014-07-17  
* Modified By		
* Modified Date:                                      
* Why & What is modified  
* Version:  					v1.0
*/
public class ReadXml {
	//EPGFileSet下的节点内容
	public String EPGGroup = "";
	public String SystemFile = "";
	public String NeedUnTar = "";
	public String BeginTime="";
	
	//EPGFile下的节点内容
	public Map<String,Map<String,String>> objectMap;
	
	//日志标题
	static String header="[ReadXml.java][read xml]";
	//log4j类
	private static Logger log = Logger.getLogger(ReadXml.class);
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {

		String srcFile="e:\\testEPGXML_20151225.xml";
		//String srcFile="e:\\a.xml";
		ReadXml rx=new ReadXml();
		System.out.println("result:"+rx.getFileValues(srcFile));
		System.out.println("EPGGroup--"+rx.EPGGroup);
		System.out.println("SystemFile--"+rx.SystemFile);
		System.out.println("NeedUnTar--"+rx.NeedUnTar);
		System.out.println("BeginTime--"+rx.BeginTime);
		for (Map.Entry<String, Map<String, String>> entry : rx.objectMap.entrySet()) {
			   //System.out.println("key= " + entry.getKey());
			   for (Map.Entry<String, String> subEntry : entry.getValue().entrySet()) {
				   System.out.println(subEntry.getKey() + "---" + subEntry.getValue());
			   }
		}
		
	}
	
	
	/**  
	* FunName:		getFileValues 
	* Description : 解析xml文件，获取xml中参数
	*                     
	* @param：          	fullFilePathName xml文件名 如：c:\\a.xml	 
	* @return：		String 处理结果 	    
	*                      
	* @Author:      abel  
	* @Create Date: 2015-06-01
	*/
	public String getFileValues(String fullFilePathName){
		//返回值
		String result="0";
		
		try{
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(fullFilePathName);
			Element root = doc.getRootElement();
			Element memberElm = root.element("Objects");
			
			Iterator it = memberElm.elementIterator("Object");
			Iterator itSub=null;
			Iterator itSubtest=null;
			Element memberObj=null;
			Element memberObjSub=null;
			Element memberObjSubtest=null;
			String elementType="";
			String temp="";
			String temptest="";
			while(it.hasNext()){
				memberObj=(Element)it.next();
				elementType=memberObj.attributeValue("ElementType");
				//action=memberObj.attributeValue("Action");
				
				if("EPGFileSet".equals(elementType)){
					itSubtest=memberObj.elementIterator("Property");
					while(itSubtest.hasNext()){
						memberObjSubtest=(Element)itSubtest.next();
						temptest=memberObjSubtest.attributeValue("Name");
						if(temptest==null)temptest="";
						if("EPGGroup".equals(temptest)){
							EPGGroup=memberObjSubtest.getText();
						}else if("SystemFile".equals(temptest)){
							SystemFile=memberObjSubtest.getText();
						}else if("NeedUnTar".equals(temptest)){
							NeedUnTar=memberObjSubtest.getText();
						}else if("BeginTime".equals(temptest)){
							BeginTime=memberObjSubtest.getText();
						}
					}
				}else if("EPGFile".equals(elementType)){
					
					Map<String ,String> map=new HashMap<String,String>();
					map.put("ID", memberObj.attributeValue("ID"));
					map.put("Action", memberObj.attributeValue("Action"));
					itSub=memberObj.elementIterator("Property");
					while(itSub.hasNext()){
						memberObjSub=(Element)itSub.next();
						temp=memberObjSub.attributeValue("Name");
						if(temp==null)temp="";
						if("SourceUrl".equals(temp)){
							map.put("SourceUrl", memberObjSub.getText());
						}else if("DestPath".equals(temp)){
							map.put("DestPath", memberObjSub.getText());
						}else if(temp.equals("MD5")){
							map.put("MD5", memberObjSub.getText());
						}
					}	
					
					if(objectMap==null){
						objectMap=new HashMap<String, Map<String,String>>();
					}
					objectMap.put(memberObj.attributeValue("ID"), map);
				}
			}
						
		}catch(Exception e){
			System.out.println(header+"read xml exception:"+fullFilePathName+"$"+e);
			log.error(header+"read xml exception:"+fullFilePathName+"$"+e);
		}
		
		return result;

	}
	
}