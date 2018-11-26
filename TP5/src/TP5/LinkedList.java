/**
 * @class			: LinkedList
 * @interface		: LinkedListInterface
 * @author	 		: Ons mlouki
 * 					  Ons.mlouki@gmail.com
 */
package TP5;

import java.io.IOException;
import java.util.ArrayList;

public class LinkedList implements LinkedListInterface {

	public MyListInterface build(Operator op, ArrayList<Object> val1, ArrayList<Object> val2) throws IOException{


		StringBuilder chaineContent=new StringBuilder();

		MyListInterface list = new MyList();	

		list.add(val1);
		chaineContent.append("" + val1);

		list.add(val2);
		chaineContent.append(" " + val2);

		SetCalculatorInterface myCalculator= new SetCalculator();

		int i=1;

		switch (op){

		case UNION:{
			list.add(myCalculator.union(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i)); 
		}; break;

		case INTERSECTION:{
			list.add(myCalculator.intersection(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i)); 
		}; break;

		case DIFFERENCE:{
			list.add(myCalculator.difference(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i)); 
		}; break;

		case SYMMETRIC_DIFFERENCE:{
			list.add(myCalculator.symDifference(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i));
		}; break;

		case IS_SUBSET:{
			list.add(myCalculator.isSubset(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i)); 

		}; break; 

		case IS_SUPERSET: {
			list.add(myCalculator.isSuperset(list.getAt(i-1), list.getAt(i)));
			i++;
			chaineContent.append(" " + list.getAt(i));
		}; break;

		default:
			System.out.println("Unindentified operator " + op + ". Refer to «Operator.java» for the complete list of available operators");
			break;
		}

		return list;
	}
}
