/**
 * @class			: SetCalculator
 * @interface		: SetCalculator
 * @author	 		: Ons mlouki
 * 					  Ons.mlouki@gmail.com				  
 */
package TP5;

import java.util.ArrayList;

public class SetCalculator implements SetCalculatorInterface {

	public ArrayList<Object> union(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<Object> tmp = new ArrayList<Object> (setA);
		for(Object a:setB){
			if(!setA.contains(a))
				tmp.add(a);
		}
		return tmp;
	}

	public ArrayList<Object> intersection(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<Object> tmp = new ArrayList<Object>();
		for (Object x : setA)
			if (setB.contains(x))
				tmp.add(x);
		return tmp;
	}

	public ArrayList<Object> difference(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<Object> tmp = new ArrayList<Object>(setA);
		tmp.removeAll(setB);
		return tmp;
	}

	public ArrayList<Object> symDifference(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<Object> tmpA;
		ArrayList<Object> tmpB;

		tmpA = union(setA, setB);
		tmpB = intersection(setA, setB);
		return difference(tmpA, tmpB);
	}

	@SuppressWarnings("unchecked")
	public <T> ArrayList<T> isSubset(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<T> tmp = new ArrayList<T>();
		tmp.add((T) String.valueOf(setB.containsAll(setA)));
		return tmp;
	}

	@SuppressWarnings("unchecked")
	public <T> ArrayList<T> isSuperset(ArrayList<Object> setA, ArrayList<Object> setB) {
		ArrayList<T> tmp = new ArrayList<T>(); 
		tmp.add((T) String.valueOf(setA.containsAll(setB)));
		return tmp;
	}

}
