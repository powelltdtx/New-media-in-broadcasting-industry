package com.besto.epgms.manage.impl;

import java.io.File;
import java.io.FileOutputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.mortbay.log.Log;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * 
*Project:  < ms>      
* Comments:  <生成xml>         
* JDK version used:<JDK1.6>
* Namespace:  WriteXml
* Author:   <powell/滕翔>
* Create Date: <2015-12-27>  
* Version:  <1.0>
 */
public class WriteXml {
//	public static final String CREATE_XML_LOCAL_PATH="E://downstreamxml//";
	public static final String CREATE_XML_LOCAL_PATH="downstreamxml/";
	public static final String CREATE_XML_LOCAL_NAME="20151228_05.xml";
	 
	
	public static void main(String[] args) {
		WriteXml wx = new WriteXml();
        //wx.createXML();
        
		wx.createXML("Group","0","1","222","REGIST-UPDATE","1232","ftp://123321@123321/3.tar","source","22rd",CREATE_XML_LOCAL_PATH,CREATE_XML_LOCAL_NAME);
        
	}
	
	/**
	 * 
	* FunName:        createXML
	* Description :   创建xml
	*                     
	* @param:   @param EPGGroup
	* @param:   @param SystemFile
	* @param:   @param NeedUnTar
	* @param:   @param BeginTime
	* @param:   @param Action
	* @param:   @param ID
	* @param:   @param SourceUrl
	* @param:   @param DestPath
	* @param:   @param MD5
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-27>
	 */
	public String createXML(String EPGGroup,String SystemFile,String NeedUnTar,String BeginTime,String Action,String ID,String SourceUrl,String DestPath,String MD5,String localXmlPath,String localXmlName){
        String xmlStr = null;
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.newDocument();
            document.setXmlVersion("1.0");

            //ADI
            Element adi = document.createElement("ADI");
            adi.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
            
            //Objects
            Element objects = document.createElement("Objects");
            
            //EPGFileSet
            Element objectEPGFileSet = document.createElement("Object");
            objectEPGFileSet.setAttribute("ID", System.currentTimeMillis()+"");
            objectEPGFileSet.setAttribute("ElementType", "EPGFileSet");
            
            //EPGFileSet property
            Element propertyEPGGroup = document.createElement("Property");
            propertyEPGGroup.setAttribute("Name", "EPGGroup");
            propertyEPGGroup.setTextContent(EPGGroup);
            objectEPGFileSet.appendChild(propertyEPGGroup);
            Element propertySystemFile = document.createElement("Property");
            propertySystemFile.setAttribute("Name", "SystemFile");
            propertySystemFile.setTextContent(SystemFile);
            objectEPGFileSet.appendChild(propertySystemFile);
            Element propertyNeedUnTar = document.createElement("Property");
            propertyNeedUnTar.setAttribute("Name", "NeedUnTar");
            propertyNeedUnTar.setTextContent(NeedUnTar);
            objectEPGFileSet.appendChild(propertyNeedUnTar);
         /*   Element propertyBeginTime = document.createElement("Property");
            propertyBeginTime.setAttribute("Name", "BeginTime");
            propertyBeginTime.setTextContent(BeginTime);
            objectEPGFileSet.appendChild(propertyBeginTime);*/
            
            //EPGFile
            Element objectEPGFile = document.createElement("Object");
            objectEPGFile.setAttribute("ElementType", "EPGFile");
            objectEPGFile.setAttribute("ID", ID);
            objectEPGFile.setAttribute("Action",Action);
            
            //EPGFile property
            Element propertySourceUrl = document.createElement("Property");
            propertySourceUrl.setAttribute("Name", "SourceUrl");
            propertySourceUrl.setTextContent(SourceUrl);
            objectEPGFile.appendChild(propertySourceUrl);
            Element propertyDestPath = document.createElement("Property");
            propertyDestPath.setAttribute("Name", "DestPath");
            propertyDestPath.setTextContent("");
            objectEPGFile.appendChild(propertyDestPath);
            Element propertyMD5 = document.createElement("Property");
            propertyMD5.setAttribute("Name", "MD5");
            propertyMD5.setTextContent(MD5);
            objectEPGFile.appendChild(propertyMD5);
            
            //拼合
            document.appendChild(adi);
            adi.appendChild(objects);
            objects.appendChild(objectEPGFileSet);
            objects.appendChild(objectEPGFile);
            
            TransformerFactory transFactory = TransformerFactory.newInstance();
            Transformer transFormer = transFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            
            //保存
            File file = new File(localXmlPath,localXmlName);
            if(!file.exists()){
                file.createNewFile();
            }
            FileOutputStream out = new FileOutputStream(file);
            StreamResult xmlResult = new StreamResult(out);
            Log.info("xml保存本地了 路径是----------->"+localXmlPath+"===="+localXmlName);
            transFormer.transform(domSource, xmlResult);
        } catch (Exception e) {
        }

        Log.info("xmlStr----------->"+xmlStr);
        return xmlStr;
    }
	
	
	/**
	 * 生成xml
	* FunName:        createXML
	* Description :   TODO
	*                     
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-27>
	 */
	public String createXML(){
        String xmlStr = null;
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.newDocument();
            document.setXmlVersion("1.0");

            //ADI
            Element adi = document.createElement("ADI");
            adi.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
            
            //Objects
            Element objects = document.createElement("Objects");
            
            //EPGFileSet
            Element objectEPGFileSet = document.createElement("Object");
            objectEPGFileSet.setAttribute("ElementType", "EPGFileSet");
            
            //EPGFileSet property
            Element propertyEPGGroup = document.createElement("Property");
            propertyEPGGroup.setAttribute("Name", "EPGGroup");
            propertyEPGGroup.setTextContent("GroupA");
            objectEPGFileSet.appendChild(propertyEPGGroup);
            Element propertySystemFile = document.createElement("Property");
            propertySystemFile.setAttribute("Name", "SystemFile");
            propertySystemFile.setTextContent("0");
            objectEPGFileSet.appendChild(propertySystemFile);
            Element propertyNeedUnTar = document.createElement("Property");
            propertyNeedUnTar.setAttribute("Name", "NeedUnTar");
            propertyNeedUnTar.setTextContent("1");
            objectEPGFileSet.appendChild(propertyNeedUnTar);
            Element propertyBeginTime = document.createElement("Property");
            propertyBeginTime.setAttribute("Name", "BeginTime");
            propertyBeginTime.setTextContent("1111");
            objectEPGFileSet.appendChild(propertyBeginTime);
            
            //EPGFile
            Element objectEPGFile = document.createElement("Object");
            objectEPGFile.setAttribute("ElementType", "EPGFile");
            objectEPGFile.setAttribute("ID", "1234");
            objectEPGFile.setAttribute("Action", "REGIST-UPDATE");
            
            //EPGFile property
            Element propertySourceUrl = document.createElement("Property");
            propertySourceUrl.setAttribute("Name", "SourceUrl");
            propertySourceUrl.setTextContent("ftp://smg:smg@202.11.12.56:21/EPG/2.tar");
            objectEPGFile.appendChild(propertySourceUrl);
            Element propertyDestPath = document.createElement("Property");
            propertyDestPath.setAttribute("Name", "DestPath");
            propertyDestPath.setTextContent("source");
            objectEPGFile.appendChild(propertyDestPath);
            Element propertyMD5 = document.createElement("Property");
            propertyMD5.setAttribute("Name", "MD5");
            propertyMD5.setTextContent("34rd");
            objectEPGFile.appendChild(propertyMD5);
            
            //拼合
            document.appendChild(adi);
            adi.appendChild(objects);
            objects.appendChild(objectEPGFileSet);
            objects.appendChild(objectEPGFile);
            
            TransformerFactory transFactory = TransformerFactory.newInstance();
            Transformer transFormer = transFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            
            //保存
            File file = new File(CREATE_XML_LOCAL_PATH+CREATE_XML_LOCAL_NAME);
            System.out.println(CREATE_XML_LOCAL_PATH+CREATE_XML_LOCAL_NAME);
            if(!file.exists()){
                file.createNewFile();
            }
            FileOutputStream out = new FileOutputStream(file);
            StreamResult xmlResult = new StreamResult(out);
            transFormer.transform(domSource, xmlResult);
        } catch (Exception e) {
        }

        return xmlStr;
    }
}
