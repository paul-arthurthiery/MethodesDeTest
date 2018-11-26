package TP5;

import java.util.ArrayList;

public class Main {

	public static void main(String[] args) throws Exception {

		////////////////////// Build parameters /////////////////////	
		ArrayList<Object> val1 = new ArrayList<Object>();
		ArrayList<Object> val2 = new ArrayList<Object>();

		val1.add(4);
		val1.add(1);
		val1.add(1);
		val1.add(2);
		
		val2.add(1);
		val2.add(1);
		val2.add(5);
		val2.add(5);
		
		//////////////////////// Linked List ///////////////////////	
		MyListInterface list = new MyList();	
		LinkedListInterface suiteChainee = new LinkedList();

		list = suiteChainee.build(Operator.UNION, val1, val2);
		
        //////////////////////// Display Result ///////////////////////	
		StringBuilder stringContent = new StringBuilder();
		
		for(int i = 0; i < list.getSize(); i++){
			stringContent.append(" " + list.getAt(i));
		}	
		
		System.out.println("My List : " + stringContent);
	}

}
